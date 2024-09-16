import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserMenuComponent } from './user-menu.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserMenuComponent', () => {
  let component: UserMenuComponent;
  let fixture: ComponentFixture<UserMenuComponent>;

  beforeEach(async () => {    
    await TestBed.configureTestingModule({
      imports: [UserMenuComponent,HttpClientTestingModule]      
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not have visible menu', () => {
    expect(component.menuVisible).toBeFalse();
  });

  it('should have items', () => {
    expect(component.items).toBeTruthy();
  });
});
